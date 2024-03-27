<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText"/>
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>
            <ContactList 
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ nào</p>
            <div class="mt-3 row justify-content-around align-item-center">
                <button class="btn btn-sm btn-primary" @cick="refreshList()">
                    <i class="fa-brands fa-firefox"></i>Làm mới
                </button>
                <button class="btn btn-sm btn-success" @cick="goToAddContact">
                    <i class="fa-regular fa-square-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @cick="removeAllContact">
                    <i class="fa-solid fa-trash-can"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>Chi tiết liên hệ 
                    <i class="fas fa-address-card"></i>
                </h4>
                <ContactCard :contact="activeContact"/>
                <router-link
                    :to="{
                        name:'contact.edit',
                        params:{ id:activeContact._id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fas-edit"></i>
                        Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import ContactCard from '@/components/ContactCard.vue';
import ContactList from '@/components/ContactList.vue';
import InputSearch from '@/components/InputSearch.vue';
import ContactService from '@/services/contact.service';


export default {
    components:{
        ContactCard,
        InputSearch,
        ContactList,
    },

    data(){
        return{
            contacts:[],
            activeIndex:-1,
            searchText:"",
        }
    },
    watch:{
        //Giam sat cac thay doi cua bien searchText
        //bo chon cac phan tu dc chon tu danh sach
        searchText(){
            this.activeIndex=-1;
        },
    },
    computed:{
        //chuyen cac doi tuong contact thanh chuoi de tim kiem
        contactStrings(){
            return this.contacts.map((contact)=>{
                const {name,email,adress,phone} = contact;
                return [name,email,adress,phone].join("");
            })
        },
        // Tra ve contact chua thong tin can tim
        filteredContacts(){
            if(!this.searchText)return this.contacts;
            console.log(this.contacts)
            return this.contacts.filter((_contact,index)=>
                this.contactStrings[index].includes(this.searchText)
            )
        },
        activeContact(){
            if(this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex]
        },
        filteredContactsCount(){
            return this.filteredContacts.length;
        },
    },
    methods:{
        async retrieveContacts(){
            try{
                this.contacts = await ContactService.getAll();
                
            }catch(e){
                console.log(e)
            }
        },
        refreshList(){
            this.retrieveContacts();
            this.activeIndex=-1;
        },
        async removeAllContact(){
            if(confirm("Bạn muốn xóa tất cả liên hệ")){
                try{
                    await ContactService.deleteAll();
                    this.refreshList()
                }catch(e){
                    console.log(e);
                }
            }
        },
        goToAddContact(){
            this.$router.push({name:"contact.add"})
        }
    },
    mounted(){
        this.refreshList()
    }
}
</script>
<style scoped>
    .page{
        text-align: left;
        max-width: 750px;
    }
</style>