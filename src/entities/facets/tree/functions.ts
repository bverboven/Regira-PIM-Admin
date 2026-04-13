import { TreeList, type TreeNode } from "@/regira_modules/treelist"
import type FamilyItem from "./FamilyItem"
import { TreeItem, ChildItem } from "./TreeItem"

export function toTreeItems(selfId: number, family: Array<FamilyItem>): Array<TreeItem> {
    const ids = [...new Set([selfId, ...family.flatMap(({ parentId, childId }) => [parentId, childId])])].filter((x) => x != null)
    return ids.map((id) => {
        const type = family.find((x) => x.childId === id)?.childType || family.find((x) => x.parentId === id)?.parentType || ""
        return TreeItem.create({
            id,
            type,
            children: family.filter((x) => x.parentId === id).map(({ childId: id, childType: type }) => ChildItem.create({ id, type })),
        })
    })
}

export function toTree(selfId: number, family: Array<FamilyItem>): TreeList<TreeItem> {
    const treeItems = toTreeItems(selfId, family)
    const roots = treeItems.filter((x) => !family.some((f) => f.childId == x.id))
    console.debug("facet tree", { treeItems, roots })
    const tree = new TreeList<TreeItem>()
    function add(item: TreeItem, parentNode?: TreeNode<TreeItem>) {
        const node = tree.addValue(item, parentNode)
        if (item.children?.length) {
            item.children.forEach((child) => {
                const childItem = ChildItem.create({ ...child, ...treeItems.find((x) => child.id === x.id)! })
                add(childItem, node)
            })
        }
    }
    roots.forEach((item) => add(item))
    return tree
}
