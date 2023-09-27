export const buildTreePermission = (arr) => {
    const tree = {};
  
    for (const item of arr) {
      const parts = item.split('.');

      let node = tree;
  
      for (const part of parts) {
        if (!node[part]) {
          node[part] = {};
        }
        node = node[part];
      }
    }
  
    const createTreeNodes = (node, key, level) => {
      const children = [];
      for (const [childKey, childNode] of Object.entries(node)) {
        // const title = childKey === '' ? 'Chọn tất cả' : childKey;

        if(level === 1) {
          children.push({
            title: <h2 className="font-semibold text-[#a3a3a3]">{childKey.toUpperCase()}</h2>,
            selectable: true,
            key: `${key}` + `${childKey}`,
            children: createTreeNodes(childNode, `${key}.` + `${childKey}.`, level + 1)
          });
          continue;
        }

        if(level === 2) {
          children.push({
            title: <h2 className="font-semibold">{childKey}</h2>,
            selectable: true,
            key: `${key}` + `${childKey}`,
            children: createTreeNodes(childNode, `${key}` + `${childKey}.`, level + 1)
          });
          continue;
        }

        children.push({
          title: childKey,
          key: `${key}` + `${childKey}`,
          children: createTreeNodes(childNode, `${key}` + `${childKey}.`, level + 1)
        });

      }
      return children;
    };
  
    return createTreeNodes(tree, 'dsc', 1)
  };