// LibTask
//import LibCommon from '@/libs/LibCommon';

//
export default {
    get_const: function(){
        return {
            DB_NAME: "task_idx_kuc_db",
            DB_VERSION: 1,
            DB_STORE: {
                tasks: '++id, title, content ,created_at',
            }
        }
    },


}
