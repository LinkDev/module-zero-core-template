import { Component, Input, Injector, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
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
      (initialized)="onInitialized(tree)">
      <ng-template #treeNodeTemplate let-node="node" let-index="index" >
        <input style="position: static;opacity:100" id="{{node.data.id}}"
         
          type="checkbox"
          [checked]="node.data.checked"/>
          {{ node.data.name }}
     </ng-template>
    </tree-root>`
})

export class TreeComponent implements OnInit {
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
                TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
            }
        },
        keys: {
            [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
        }
    };

    @Input() public treeValues: any[];
    @Input() proxy: string;
    @Input() public rootValues: any[];
    @Input() multiselect: boolean = false;
    @Input() selectedvalued: any[];
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

        let filter: string;
        if (this.rootValues != undefined) {
            for (var i = 0; i < this.rootValues.length; i++) {
                filter += "ParentId eq " + this.rootValues[i];
                if (i < this.rootValues.length - 1)
                    filter += " or ";
            }
        }
        else
            filter = "ParentId eq null";
        // let filterSearch = filter.length > 1 ? filter : "ParentId eq null";
        this.service.getAll(filter).subscribe((data: any) => {
            this.treeValues = data.items;
            //console.log(data);
            //console.log(this.treeValues);

            setTimeout(() => {
                this.nodes = [];
                for (let i = 0; i < this.treeValues.length; i++) {
                    
                    this.nodes.push({
                        id: this.treeValues[i].id,
                        name: this.treeValues[i].name,
                        subTitle: this.treeValues[i].bio,
                        checked: false,
                        hasChildren: true
                    });
                }
            }, 1)
        });
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
                            Object.assign({ hasChildren: true, checked: false }, c)
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
        console.log(event);
        if (event.eventName == "activate") {
            console.log(event);
            event.node.data.checked = true;
            this.SendSelectedNode(event.node.data.id + ',' + event.node.data.name);
        }
        else if (event.eventName == "deactivate") {
            if (!this.multiselect)
                event.node.data.checked = false;
            this.SendSelectedNode("");
        }
    }

    check(node, checked, event) {
        //alert(node.checked);
        //debugger;
        if (event.type == "change") {
            node.data.checked = checked;
            this.SendSelectedNode(node.data.id + ',' + node.data.name);
        }
    }

    onInitialized(tree) {
        // tree.treeModel.getNodeById('11').setActiveAndVisible();
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
    SendSelectedNode(value) {
        if (this.selected == undefined)
            this.selected = new EventEmitter();
        //alert("emit");
        this.selected.emit(value);
    }
}