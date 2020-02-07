
import json
import string
import networkx as nx

def write_graph(G):

    nodes = []
    links = []

    for n in G.nodes:
        nodes.append({
            'id': n,
            'size': 1,
            'labelInside': string.ascii_uppercase[n]
        })

    for e in G.edges:
        links.append({
            'source': e[0],
            'target': e[1]
        })

    json_str = json.dumps({ 'nodes': nodes, 'links': links }, indent=4)

    with open('graph.json', 'w') as f:
        f.write(json_str)


G = nx.fast_gnp_random_graph(15, 0.15)

write_graph(G)