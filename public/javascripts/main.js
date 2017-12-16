'use strict';

(function(){
    $(document).ready(()=>{

        $('#myCarousel').carousel({
            interval: 4000
        });
        $('.carousel .item').each(function(){
            var next = $(this).next();
            if (!next.length) {
            next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            for (var i=0;i<2;i++) {
            next=next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
                }
            
            next.children(':first-child').clone().appendTo($(this));
            }
        });
        //
        $('#goAnnounce').on('click', ()=>{
            try{
                axios.post('/apiv1/announce', {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMzA0ODYxZWEwYTRhMTVlOGY0ODFiZSIsImlhdCI6MTUxMzM5NjIwMSwiZXhwIjoxNTEzNDgyNjAxfQ.s1A9o4O6_A_i_wrSfwO0W7BtLtymdBdMTdcaVtAk5qo',
                user_id: '5a304861ea0a4a15e8f481be'
                })
                .then((data)=>{
                    let dataDiv1 = $('#dataAnnounce1');
                    let dataDiv2 = $('#dataAnnounce2');
                    let info = data.data.announces; // []
                    
                    let obj1 = JSON.stringify(info[0]);
                    let obj2 = JSON.stringify(info[1]);
                    dataDiv1.html(
                        `<code>${obj1}</code>`
                    );
                    dataDiv2.html(
                        `<code>${obj2}</code>`
                    );        
                });
            }catch(err){
                console.log(err);
            }
            
        });
    });
    
})();