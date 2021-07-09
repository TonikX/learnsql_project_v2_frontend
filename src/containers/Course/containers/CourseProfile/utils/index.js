
export const processRouteData = data => {
    let nodes = data.nodes.map(node => ({ ...node, id: String(node.id) }));
    let edges = data.links.filter(link => link.source < link.target).map(link => ({
        ...link,
        target: String(link.target),
        source: String(link.source),
    }));

    nodes[0].title = 'CS1. Простой оператор SELECT';
    nodes[5].title = 'СS6. Агрегатные функции';

    edges.push({ source: '7', target: '6', isPointPath: true })

    if (!localStorage.getItem('passed')) {
        edges = edges.map(item => ({ ...item, isPointPath: false }))
    }

    return { nodes, edges: [...edges, ] };
}