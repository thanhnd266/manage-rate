export const checkPermission = (userPermission, requirePermission) => {
    let validated = false;
    for(let i = 0; i < userPermission.length; i++) {
        if(userPermission[i].includes(requirePermission)) {
            validated = true;
            break;
        } else {
            validated = false;
        }
    }
    return validated;
}

export const checkListAllowed = (userPermission, listItem) => {
    for(let i = 0; i < listItem.length; i++) {
        if(listItem[i]?.children?.length > 0) {
            for(let j = 0; j < listItem[i].children.length; j++) {
                if(checkPermission(userPermission, listItem[i].children[j].permission)) {
                    return true;
                }
            }
        } else {
            if(checkPermission(userPermission, listItem[i].permission)) {
                return true;
            }
        }
    }
}