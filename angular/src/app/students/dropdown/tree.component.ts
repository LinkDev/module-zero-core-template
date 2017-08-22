import { Component, Input } from "@angular/core";
import { StudentDto } from "shared/service-proxies/service-proxies";

@Component({
    selector: 'tree-nodes',
    template: '<tree-root [nodes]="nodes"></tree-root>'
})

export class TreeComponent {
    @Input() public dropdownValues: StudentDto[] = [];
    
    buildTree(): void {
        for (var i = 1; i <= this.dropdownValues.length; i++) {
            //this.nodes.push(this.dropdownValues[i].id;
            //this.dropdownValues[i].name;
            
        }
    }
    nodes = [
        {
            id: 1,
            name: 'root1',
            children: [
                { id: 2, name: 'child1' },
                { id: 3, name: 'child2' }
            ]
        },
        {
            id: 4,
            name: 'root2',
            children: [
                { id: 5, name: 'child2.1' },
                {
                    id: 6,
                    name: 'child2.2',
                    children: [
                        { id: 7, name: 'subsub' }
                    ]
                }
            ]
        }
    ];
}
