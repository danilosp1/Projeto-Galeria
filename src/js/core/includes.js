import $ from 'jquery'

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

                // processa includes dentro dos includes (recursividade)
                loadIncludes(element)
            }
        })
    })
}

loadIncludes()