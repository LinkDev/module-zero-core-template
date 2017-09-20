import { Component, Input, Injector, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { TreeNode, ITreeOptions, IActionMapping, KEYS, TREE_ACTIONS } from "angular-tree-component/dist/angular-tree-component";
import { StudentServiceProxy, StudentDto, PagedResultDtoOfStudentDto } from '@shared/service-proxies/service-proxies';


@Component({
    selector: 'tree-nodes',
    template: `<tree-root 
      #tree
      [nodes]="nodes"
      [options]="customTemplateStringOptions"
      [focused]="true"
      (event)="onEvent($event)"
      (updateData)="onEvent($event)"
      (initialized)="onInitialized(tree)">
      <ng-template #treeNodeTemplate let-node="node" let-index="index" >
        <input style="position: static;opacity:100" id="{{node.data.id}}"
          type="checkbox" 
          [checked]="node.data.checked"/>
          {{ node.data.name }}
     </ng-template>
    </tree-root>`
})

export class TreeComponent implements OnInit, AfterViewInit {
    actionMapping: IActionMapping = {
        mouse: {
            contextMenu: (tree, node, $event) => {
                $event.preventDefault();
                alert(`context menu for ${node.data.name}`);
            },
            dblClick: (tree, node, $event) => {
                if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            },
            click: (tree, node, $event) => {
                this.check(node, !node.data.checked, $event)
                //alert("clicked " + this.selected);
                if (this.multiselect)
                    TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
                else
                    TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
            }
        },
        keys: {
            [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
        }
    };

    public treeValues: any[];
    @Input() proxy: string;
    @Input() public rootValues: any[];
    @Input() multiselect: boolean = false;
    @Input() selectedValues: any = null;
    @Output() selected: EventEmitter<any>;
    @ViewChild('tree') treeRoot;


    nodes: any[];
    service: any;
    constructor(private injector: Injector) {
        this.selected = new EventEmitter();
    }
    ngOnInit() {
        //console.log(this.proxy);
        this.service = this.injector.get(this.proxy);
        let filter = "ParentId " + (this.rootValues != undefined ? "in " + this.rootValues : "eq null");
        //console.log("valuessssss");
        //console.log(this.selectedvalues);
        //this.selectedvalues = [2, 5, 6];
        this.service.getAll(filter).subscribe((data: any) => {
            this.treeValues = data.items;
            setTimeout(() => {
                this.nodes = [];
                for (let i = 0; i < this.treeValues.length; i++) {
                    let checked = this.CheckSelectedValues(this.treeValues[i].id);
                    this.nodes.push({
                        uuid: this.treeValues[i].id,
                        id: this.treeValues[i].id,
                        name: this.treeValues[i].name,
                        subTitle: this.treeValues[i].bio,
                        checked: checked,
                        hasChildren: true
                    });
                }
                this.expandTree();
            }, 1)
        });
    }
    ngAfterViewInit(): void {
    }
    getChildren(node: any) {
        return new Promise((resolve, reject) => {
            //console.log("id " + node.data.id);
            if (node.data.id != undefined) {
                this.service.getAll("ParentId eq " + node.data.id).subscribe((data: any) => {
                    //console.log("data " + data);
                    if (data != undefined) {
                        let children = data.items;
                        resolve(children.map(c =>
                            Object.assign({ uuid: c.id, hasChildren: true, checked: this.CheckSelectedValues(c.id) }, c)
                        ));
                    }
                    else {
                        reject("rejected");
                    }
                });
            }
            else {
                //console.log("here");
                //resolve("No Data Found");
            }
        });
    }
    childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }
    onEvent(event) {
        if (event.eventName == "activate") {
            console.log(event);
            event.node.checked = true;
            event.node.data.checked = true;
            this.SetSelectedNode(event.node.data);
        }
        else if (event.eventName == "deactivate") {
            event.node.checked = false;
            event.node.data.checked = false;
            this.SetSelectedNode(null);
        }
        else if (event.eventName == "updateData") {
            console.log("updateData");
            console.log(event);
        }
    }

    check(node, checked, event) {
        //alert(node.checked);
        //debugger;
        if (event.type == "change") {
            node.data.checked = checked;
            this.SetSelectedNode(node);
        }
    }

    onInitialized(tree) {
    }

    customTemplateStringOptions: ITreeOptions = {
        // displayField: 'subTitle',
        isExpandedField: 'expanded',
        idField: 'uuid',
        getChildren: this.getChildren.bind(this),
        actionMapping: this.actionMapping,
        nodeHeight: 23,
        //allowDrag: (node) => {
        //    // console.log('allowDrag?');
        //    return true;
        //},
        //allowDrop: (node) => {
        //    // console.log('allowDrop?');
        //    return true;
        //},
        animateExpand: true,
        animateSpeed: 30,
        animateAcceleration: 1.2
    }
    deactivate() {
        if (this.treeRoot != undefined && this.treeRoot.treeModel != undefined
            && this.treeRoot.treeModel.getFocusedNode() != undefined
            && this.treeRoot.treeModel.getFocusedNode().isActive) {
            this.treeRoot.treeModel.getFocusedNode().toggleActivated();
            this.treeRoot.treeModel.getFocusedNode().blur();
        }
        if (this.treeRoot != undefined && this.treeRoot.treeModel != undefined)
            this.treeRoot.treeModel.collapseAll();
    }
    SetSelectedNode(nodeValue) {
        if (this.selected == null)
            this.selected = new EventEmitter();

        this.selected.emit(nodeValue);
    }
    CheckSelectedValues(id: any) {
        let checked: boolean = false;
        if (this.selectedValues != null && this.selectedValues != undefined) {
            if (this.selectedValues instanceof Array) {
                let ids = this.selectedValues.map(function(a) { return a["id"]; });
                checked = ids.find(x => x.id == id) != undefined ? true : false;
            }
            else {
                checked = this.selectedValues.id == id ? true : false;
            }
            if (checked)
                setTimeout(() => {
                    let node: TreeNode = this.treeRoot.treeModel.getNodeById(id);
                    if (node != undefined) {
                        node.setActiveAndVisible();
                    }

                }, 10);
            return checked;
        }
    }
    expandTree() {
        //debugger;
        if (this.selectedValues != null && this.selectedValues != undefined) {
            let parents: any[] = this.selectedValues.parents;
            if (parents != undefined && parents != null && parents.length > 0) {
                parents.reverse();
                this.doNodeSetTimeout(parents);
            }
        }
    }
    doNodeSetTimeout(parents) {
        let id = parents[0].id;
        setTimeout(() => {
            let node: TreeNode = this.treeRoot.treeModel.getNodeById(id);
            if (node != undefined) {
                node.toggleExpanded().then(t=> {
                    for (var i = 1; i < parents.length; i++) {
                        this.doChildSetTimeout(parents[i].id, parents[0].id); 
                    }});
                //this.treeRoot.treeModel.updateData();
            }
        }, 1);
    }
    doChildSetTimeout(id, rootId) {
        console.log(this.treeRoot.treeModel);
        setTimeout(() => {
            debugger;
            let node: TreeNode = this.treeRoot.treeModel.getNodeById(rootId);
            if (node != undefined) {
                let children: TreeNode[] = node.data.children;
                if (children != undefined) {
                    let currentNode: TreeNode = this.treeRoot.treeModel.getNodeById(id);
                    //let currentNode: TreeNode = children.find(c => c.id == id);
                    if (currentNode != undefined)
                        currentNode.expand();
                }
            }
        }, 100);
    }
}