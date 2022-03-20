import $ from 'jquery'

// funções que serão executadas logo após a página ser carregada com sucesso
const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)){
        loadHtmlSuccessCallbacks.push(callback)
    }
}

// vai buscar [wm-include] nos filhos do parent passado (default = 'body')
function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(index, element) {
        const url = $(element).attr('wm-include')
        $.ajax({
            url,
            success(data){
                $(element).html(data)
                $(element).removeAttr('wm-include')

                // executar callbacks
                loadHtmlSuccessCallbacks.forEach(callback => callback(data))

                // processa includes dentro dos includes (recursividade)
                loadIncludes(element)
            }
        })
    })
}

loadIncludes()