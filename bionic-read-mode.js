const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

while (textNodes.nextNode()) {
  const node = textNodes.currentNode;

  if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
    const words = node.nodeValue.split(' ');

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      var halfIndex = parseInt(word.length / 2);
      if(word.length<=2){
        halfIndex=1
      }

      const boldElement = document.createElement('b');
      boldElement.textContent = word.slice(0, halfIndex);
      boldElement.className="text-dec";

      const remainingText = document.createTextNode(word.slice(halfIndex) + ' ');

      node.parentNode.insertBefore(boldElement, node);
      node.parentNode.insertBefore(remainingText, node);

      node.nodeValue = '';
    }
  }
}
