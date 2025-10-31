
const onSameList = (list_a, list_b)=> {
  if (list_a.length !== list_b.length) return false;
  const list_a_order = [...list_a].sort();
  const list_b_order = [...list_b].sort();
  return list_a_order.every((val, i) => val === list_b_order[i]);
}

export {
    onSameList
}