export default function (navItem:any, item:any, subAction:any, type:any){

    if (navItem.label === type) {
        if (subAction === "add") {
          if (!navItem.subItems.some(subItem => subItem.id === item.id)) {
            return {
              ...navItem,
              subItems: [...navItem.subItems, item],
            };
          } else {
            return navItem;
          }
        } else if (subAction === "remove") {
          return {
            ...navItem,
            subItems: navItem.subItems.filter((subItem) => subItem !== item),
          };
        }
      }


}