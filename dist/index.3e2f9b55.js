// 后执行 window.$ = 
window.$ = window.jQuery = function(selectorOrArrayOrTemplate) {
    let elements;
    if (typeof selectorOrArrayOrTemplate === "string") {
        if (selectorOrArrayOrTemplate[0] === "<") // 创建 div
        elements = [
            createElement(selectorOrArrayOrTemplate)
        ];
        else elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    } else if (selectorOrArrayOrTemplate instanceof Array) elements = selectorOrArrayOrTemplate;
    function createElement(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    const api = Object.create(jQuery.prototype) // api的 __proto__ 为 jQuery.prototype
    ;
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    });
    return api;
};
jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
    get (index) {
        return this.elements[index];
    },
    appendTo (node) {
        if (node instanceof Element) this.each((el)=>node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
        ;
        else if (node.jquery === true) this.each((el)=>node.get(0).appendChild(el)) // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
        ;
    },
    append (children) {
        if (children instanceof Element) this.get(0).appendChild(children);
        else if (children instanceof HTMLCollection) for(let i = 0; i < children.length; i++)this.get(0).appendChild(children[i]);
        else if (children.jquery === true) children.each((node)=>this.get(0).appendChild(node));
    },
    find (selector) {
        let array = [];
        this.each((n)=>{
            array.push(...n.querySelectorAll(selector));
        });
        // for (let i = 0; i < elements.length; i++) {
        //     const elements2 = Array.from(elements[i].querySelectorAll(selector))
        //     array = [...array, ...elements2]
        // }
        array.oldApi = this //保存旧的api方便end退回
        ;
        // const newApi = jQuery(array)
        return jQuery(array);
    },
    each (fn) {
        for(let i = 0; i < this.elements.length; i++)fn.call(null, this.elements[i], i);
        return this;
    },
    parent () {
        const array = [];
        this.each((node)=>{
            if (array.indexOf(node.parentNode) === -1) array.push(node.parent);
        });
        // parent函数返回的是节点的parent，再次封装jQuery(array)方便.parent后续的链式操作
        return jQuery(array);
    },
    children () {
        const array = [];
        this.each((node)=>{
            // 将所有目标节点的儿子push到array中
            array.push(...node.children);
        });
        return jQuery(array);
    },
    addClass (className) {
        // 闭包：函数访问外部的变量
        // 用闭包维持 elements 函数不死，element就不会销毁
        this.each((n)=>n.classList.add(className));
        // for (let i = 0; i < elements.length; i++) {
        //     elements[i].classList.add(className)
        // }
        // return api
        return this;
    },
    print () {
        console.log(this.elements);
    },
    end () {
        return this.oldApi;
    }
};

//# sourceMappingURL=index.3e2f9b55.js.map
