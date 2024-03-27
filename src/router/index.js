import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes =[
    {
        path:'/',
        name : "contactbook",
        component : ContactBook,
    },
    {
        path:`/:pathMatch(.*)*`,
        name: "nofound",
        component:()=>import("@/views/NotFound.vue")
    },
    {
        path:"/contacts/:id",
        name:"contact.edit",
        component:()=>import("@/views/ContactEdit.vue"),
        props:true//truyền các biến trong $router.params làm props
    },
    {
        path:"/contacts/add",
        name:"contact.add",
        component:()=>import("@/views/ContactAdd.vue"),
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;