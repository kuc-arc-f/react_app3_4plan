// LibTodo
//import LibCommon from '@/libs/LibCommon';

//
export default {
    get_const: function(){
        return {
            DB_NAME: "todo_idx_kuc_db",
            DB_VERSION: 1,
            DB_STORE: {
                todos: '++id, title, content , complete, created_at',
            }
        }
    },


}
