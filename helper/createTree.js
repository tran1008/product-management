const createTree=(arr, parentId="")=>{
    const tree=[];
    arr.forEach(item => {
        if(item.parent_id === parentId){ // nếu kiểm tra thuốc tính parent_id của collection đó bằng với khoảng trắng thì nó chính là thằng tra tiến hành tạo thêm hàm con cho nó theo sau
            const newItem=item;
            const children=createTree(arr,item.id)
            if(children.length >0){
                newItem.children=children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}
module.exports.tree=(arr, parentId="")=>{
    const tree=createTree(arr, parentId="")
    return tree;
}