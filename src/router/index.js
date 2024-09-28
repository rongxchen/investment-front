import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { ElMessage } from "element-plus"


const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/LoginView.vue"),
        alias: "/login",
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const allowList = ["/", "/login", "/404"]
router.beforeEach((to, from, next) => {
    document.title = to.name?.toString() || ""
    const token = localStorage.getItem("accessToken")
    const isExist = to.matched.length == 1
    if (!isExist) {
        const backPath = "/"
        return next("/404?backPath=" + backPath)
    }
    if (allowList.includes(to.path) || token) {
        return next()
    }
    ElMessage.warning({
        message: "please login first"
    })
    return next("/")
})

export default router
