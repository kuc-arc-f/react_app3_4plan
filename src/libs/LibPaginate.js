// LibPaginate

//
export default {
    /*********************************
     *
    ***********************************/     
   get_max_page : function(items, one_max ){
        var ret = 0;
        var div = items.length % one_max ;
        ret = items.length / one_max ;
        ret = parseInt( ret);
        if(div > 0){
            ret += 1;
        }
    //console.log( ret , div )        
        return ret;        
    },
    /*********************************
     * get , 1 page items
    ***********************************/     
    get_items: function(items, page ,one_max ){
        var ret = []
        var start = (page -1) * one_max;
        var end = page * one_max;
    // console.log( start, end )
        items.forEach(function(item, index){
            if((index >= start) && (index < end )){
                ret.push(item)
            }
    //            console.log( item )
        });
        return ret        
    },
    /*********************************
     * get , next page
    ***********************************/     
    add_page_items: function(items, add_items){
        var arr = items
        add_items.forEach(function(item){
            arr.push(item)
        });        
        return arr;
    },
}
