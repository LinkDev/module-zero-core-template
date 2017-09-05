import { Component, Input, Injector, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { TreeNode, ITreeOptions, IActionMapping, KEYS, TREE_ACTIONS } from "angular-tree-component/dist/angular-tree-component";
import { StudentServiceProxy, StudentDto, PagedResultDtoOfStudentDto } from '@shared/service-proxies/service-proxies';

const actionMapping: IActionMapping = {
    mouse: {
        contextMenu: (tree, node, $event) => {
            $event.preventDefault();
            alert(`context menu for ${node.data.name}`);
        },
        dblClick: (tree, node, $event) => {
            if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        },
        click: (tree, node, $event) => {

            //alert("clicked " + this.selected);
            $event.shiftKey
                ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
                : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
        }
    },
    keys: {
        [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
};

@Component({
    selector: 'tree-nodes',
    template: `<tree-root
      #tree
      [nodes]="nodes"
      [options]="customTemplateStringOptions"
      [focused]="true"
      (event)="onEvent($event)"
      (initialized)="onInitialized(tree)">
      <ng-template #treeNodeTemplate let-node>
        <span title="{{node.data.subTitle}}">{{ node.data.name }}</span>
        <span class="pull-right">{{ childrenCount(node) }}</span>
      </ng-template>
      <ng-template #loadingTemplate>Loading, please hold....</ng-template>
    </tree-root>`
})

export class TreeComponent implements OnInit {
    @Input() public treeValues: any[];
    @Input() proxy: string;
    @Input() public rootValues: any[];
    @Output() selected: EventEmitter<any>;

    @ViewChild('tree') treeRoot;

    //ngAfterViewInit() {
    //    console.log("heeeeeeeeeeeeeeeeeee");
    //    console.log(this.treeRoot);
    //}

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

                        //console.log("children " + children);
                        resolve(children.map(c =>
                            Object.assign({ hasChildren: true }, c)
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
            if (this.selected == undefined)
                this.selected = new EventEmitter();
            //alert("emit");
            this.selected.emit(event.node.data.id + ',' + event.node.data.name);
        }
        else if (event.eventName == "deactivate") {
            if (this.selected == undefined)
                this.selected = new EventEmitter();
            //alert("emit");
            this.selected.emit("");
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
        actionMapping,
        nodeHeight: 23,
        allowDrag: (node) => {
            // console.log('allowDrag?');
            return true;
        },
        allowDrop: (node) => {
            // console.log('allowDrop?');
            return true;
        },
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
}