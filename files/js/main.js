$(document).ready(function(){

    //navegação da pagina
    scrollTo.click(function(e){
        e.preventDefault();
        var bt = $(this);
        var target = $(bt.data('scroll'));
        $('html, body').animate({ scrollTop: target.offset().top-100 }, 800);
    });

});

$(document).ready(function(){
    $("#filter-state").change(function(){
        var selected = $(this).val();
        var table = $("#table-lojas");
        if(selected=='NULL'){
            table.find('tr').show();
        }else{
            table.find('tr').hide();
            $(selected).show();
        }
    });

    $('.shopping').click(function(){
        var largura = $(window).width();
        var altura = $(window).height();
        var rest = $(this).text();
        var hora24 = $(this).siblings('.setor-horario').find('.hora24').text();
        var hora25 = $(this).siblings('.setor-horario').find('.hora25').text();
        var hora31 = $(this).siblings('.setor-horario').find('.hora31').text();
        var hora01 = $(this).siblings('.setor-horario').find('.hora01').text();
        $('.restaurantes').animate({"margin-left":"0"}, 300, function(){
            $('.nome-rest').text(rest);
            $('.hour24').text(hora24);
            $('.hour25').text(hora25);
            $('.hour31').text(hora31);
            $('.hour01').text(hora01);
            if(largura <= 992){
                $('.restaurantes').animate({"margin-bottom":"100px"}, 300, function(){
                    $('.horarios').fadeIn(300);
                });
            }else{
                $('.horarios').fadeIn(300);
            }
        });
    });

    $('#fecha-rest').click(function(){
        var largura = $(window).width();
        $('.horarios').fadeOut('slow', function(){
            if(largura > 992){
                $('.restaurantes').animate({"margin-left":"25%"}, 300);
            }else{
                $('.restaurantes').animate({"margin-bottom":"0px"}, 300);
            }
        });
    });
});


//window.location.hash = "restaurantes";