import { visit, SKIP } from 'unist-util-visit';

// Wiki targets are content filenames, without .md: [[paper-reading|논문 읽기]].
// Only text nodes are transformed, so code blocks and inline code stay literal.
export default function remarkWikiLinks() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (node.type === 'link' || node.type === 'linkReference') return SKIP;
      if (node.type !== 'text' || !parent || index === undefined) return;
      const pattern = /\[\[([a-z0-9]+(?:[/-][a-z0-9]+)*)(?:\|([^\]\n]+))?\]\]/g;
      const children = [];
      let start = 0;
      for (const match of node.value.matchAll(pattern)) {
        if (match.index > start) children.push({ type: 'text', value: node.value.slice(start, match.index) });
        children.push({ type: 'link', url: `/wiki/${match[1]}/`, children: [{ type: 'text', value: match[2] || match[1] }] });
        start = match.index + match[0].length;
      }
      if (!children.length) return;
      if (start < node.value.length) children.push({ type: 'text', value: node.value.slice(start) });
      parent.children.splice(index, 1, ...children);
      return index + children.length;
    });
  };
}
