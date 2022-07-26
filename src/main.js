// 链式操作
// jQuery('.test')这个函数返回的是api
// api.addClass('red')这个函数返回的是api
// .addClass继续返回api
const api = jQuery('.test')
api.addClass('red').addClass('blue')

// jQuery('.wrapper').each(x => console.log(x))

jQuery('.wrapper').children().print()

jQuery('.wrapper')
    .find('.content')
    .addClass('content')
    .addClass('newContent')

const $div = $('<div>1</div>')

$('.testAppendTo').appendTo($('.hello'))