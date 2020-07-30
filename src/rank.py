
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




G = read_graph(directed=False)

alpha = 0.95

personalization = { n: 0 for n in G.nodes }
personalization[10] = 1

print(personalization)

pr = nx.pagerank(G, alpha=alpha, max_iter=500)
write_graph(f'pagerank.json', G, pr)


