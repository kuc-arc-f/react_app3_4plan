// LibBook

//import LibCommon from '@/libs/LibCommon';

//
export default {
    get_const: function(){
        return {
            DB_NAME: "book_idx_kuc_db",
            DB_VERSION: 1,
            DB_STORE: {
                books: '++id, title, content , type, radio_1, check_1, check_2, date_1,created_at',
            }
        }
    },


}
