function Node(id, number, title) {
  this.id = id
  this.number = number
  this.title = title
  this.children = []
}

var tree = new Node('', '', 'Uniclass 2015')

function file(node, id, currentNumber, title) {
  var splitPoint = currentNumber.indexOf('_')
  if (splitPoint < 0) {
    node.children.push(new Node(id, currentNumber, title))
  } else {
    var firstPart = currentNumber.substr(0, splitPoint)
    var secondPart = currentNumber.substr(splitPoint + 1)
    var arrayLength = node.children.length
    for (var i = 0; i < arrayLength; i++) {
      if (node.children[i].number == firstPart) {
        file(node.children[i], id, secondPart, title)
      }
    }
  }
}

function lookup(node, id) {
  if (id == node.id) {
    return node
  } else {
    var arrayLength = node.children.length
    for (var i = 0; i < arrayLength; i++) {
      if (id.startsWith(node.children[i].id)) {
        return lookup(node.children[i], id)
      }
    }
  }
}

function createDiv(element, divClass, divContent) {
  var newDiv = document.createElement('div')
  newDiv.className = divClass
  if (divContent) {
    newDiv.innerHTML = divContent
  }
  element.appendChild(newDiv)
  return newDiv
}

function plot(element, node) {
  if (node.children.length > 0) {
    var childrenDiv = createDiv(element, 'children')
    var arrayLength = node.children.length
    for (var i = 0; i < arrayLength; i++) {
      var nodeDiv = createDiv(childrenDiv, 'node closed')
      nodeDiv.id = node.children[i].id
      var lableDiv = createDiv(nodeDiv, 'label')
      if (node.children[i].children.length > 0) {
        lableDiv.classList.add('nonempty')
      }
      createDiv(lableDiv, 'number', node.children[i].number)
      createDiv(lableDiv, 'title', node.children[i].title)
      createDiv(lableDiv, 'id', node.children[i].id)
      lableDiv.onclick = toggleNode
    }
  }
}

function toggleNode() {
  event.stopPropagation()
  var node = this.parentElement
  if (node.classList.contains('closed')) {
    node.classList.remove('closed')
    plot(node, lookup(tree, node.id))
  } else {
    node.classList.add('closed')
    node.removeChild(node.childNodes[1])
  }
}

//Read file
var txtFile = new XMLHttpRequest()
txtFile.open('GET', 'data/data.txt', true)
txtFile.onreadystatechange = function () {
  if (txtFile.readyState === 4) {
    // document is ready to parse.
    if (txtFile.status === 200) {
      // file is found
      processFile(txtFile.responseText)
    }
  }
}
txtFile.send(null)

// Process file

function processFile(fileContent) {
  lines = fileContent.split('\n')
  lines.forEach(processLine)
  var root = document.getElementById('tree')
  plot(root, tree)
  //    tree.plot();
  //    container.innerHTML += text;
}

function close() {
  event.stopPropagation()
}

//Process line
function processLine(lineContent) {
  parts = lineContent.split('\t')
  file(tree, parts[0], parts[0], parts[1])
}
