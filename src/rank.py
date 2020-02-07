
import json
import networkx as nx
import string

def read_graph(directed=False):

    with open('graph.json', 'r') as f:
        graph = json.load(f)

    if directed:
        G = nx.DiGraph()
    else:
        G = nx.Graph()

    for n in graph['nodes']:
        G.add_node(n['id'])

    for e in graph['links']:
        G.add_edge(e['source'], e['target'])

    return G

def write_graph(filename, G, rank):

    nodes = []
    links = []

    for n in G.nodes:
        nodes.append({
            'id': n,
            'size': rank[n],
            'labelInside': string.ascii_uppercase[n]
        })

    for e in G.edges:
        links.append({
            'source': e[0],
            'target': e[1]
        })

    json_str = json.dumps({ 'nodes': nodes, 'links': links }, indent=4)

    with open(filename, 'w') as f:
        f.write(json_str)


G = read_graph()


alpha = [0.85, 0.50, 0.15]

for a in alpha:

    pr = nx.pagerank(G, alpha=a)
    write_graph(f'pagerank_{str(a)}.json', G, pr)


G = read_graph(directed=True)

alpha = [0.85, 0.50, 0.15]

for a in alpha:

    pr = nx.pagerank(G, alpha=a)
    write_graph(f'pagerank_{str(a)}_directed.json', G, pr)


