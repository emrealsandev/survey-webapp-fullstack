import { createStore } from 'vuex'
import axiosClient from '../axios';


const tmpSurveys = [
  {
    id : 100,
    title : "Emre Alşan The Tommy Shelby",
    slug: "emre-alsan-the-tommy-shelby",
    status : "draft",
    image : "https://us.v-cdn.net/5021068/uploads/editor/se/nvlhpgclvt5o.jpg",
    description:"Merhaba Ben Emre <br> En sevdiğim dizi kesinlikle ve kesinlikle PEAKY FUCKIN BLINDERS'tir Ne zaman Aksini söylersem bilin ki o ben değilimdir. Jhon Shelby Adamdır.",
    created_at : "22-03-2022 19:00:00",
    updated_at : "22-03-2022 19:00:00",
    expire_at : "22-03-2022 19:00:00",
    questions : [
      {
        id: 1,
        type: "select",
        question : "En sevdiğin karakter kim peki?",
        description: null,
        data:{
          options : [
            { uuid : "75b75b6c-a9fa-11ec-b909-0242ac120002", text:"Arthur SHELBY" },
            { uuid : "75b75b6c-a9fa-11ec-b909-0242ac120003", text:"Micheal Grey" },
            { uuid : "75b75b6c-a9fa-11ec-b909-0242ac120004", text:"Jhon SHELBY" },
            { uuid : "75b75b6c-a9fa-11ec-b909-0242ac120005", text:"Thomas SHELBY" },
            { uuid : "75b75b6c-a9fa-11ec-b909-0242ac120006", text:"Finn SHELBY" },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question : "En sevdiğin düşman kim?",
        description: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. In laborum totam laudantium est voluptates nostrum, cupiditate tempore sed odit sint. Facere cum enim nostrum, inventore modi numquam assumenda iusto laborum.",
        data:{
          options : [
            { uuid : "64881e28-b041-4446-a7f6-18e6731eaabc", text:"Billy Kimber" },
            { uuid : "64881e28-b041-4446-a7f6-18e6731earty", text:"Alfie Solomons" },
            { uuid : "64881e28-b041-4446-a7f6-18e6731eaqwe", text:"Luka Changretta" },
            { uuid : "64881e28-b041-4446-a7f6-18e6731eaxyz", text:"Müfettiş Kambpell" },
            { uuid : "64881e28-b041-4446-a7f6-18e6731enmbn", text:"Derby Sabini" },
          ],
        },
      }
    ],
  },
  {
    id : 200,
    title : "Emre Alşan The Frontend Programmer",
    slug: "emre-alsan-the-frontend-programmer",
    status : "active",
    image : "https://us.v-cdn.net/5021068/uploads/editor/se/nvlhpgclvt5o.jpg",
    description:"Merhaba Ben Emre <br> VueJS ve Laraveli Severim.",
    created_at : "22-03-2022 20:00:00",
    updated_at : "22-03-2022 20:00:00",
    expire_at : "22-03-2022 20:00:00",
    questions : [],
  },
  {
    id : 300,
    title : "Emre Alşan The Basketball Player",
    slug: "emre-alsan-the-basketball-player",
    status : "active",
    image : "https://us.v-cdn.net/5021068/uploads/editor/se/nvlhpgclvt5o.jpg",
    description:"Merhaba Ben Emre <br> Kobe ve Lebronu Severim.",
    created_at : "22-03-2022 21:00:00",
    updated_at : "22-03-2022 21:00:00",
    expire_at : "22-03-2022 21:00:00",
    questions : [],
  }
]


export default createStore({
  state: {
    user : {
      data : {},
      token : sessionStorage.getItem('TOKEN'),
    },
    surveys: [...tmpSurveys],
    
  },
  getters: {
  },
  mutations: {
    logout : (state)=>{
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  actions: {
    register({commit},user){
      return axiosClient.post('/register',user)
      .then(({data})=>{
        commit('setUser',data);
        return data;
      })
    },
    login({commit},user){
      return axiosClient.post('/login',user)
      .then(({data})=>{
        commit('setUser',data);
        return data;
      })
      
    },
    logout({commit}){
      return axiosClient.post('/logout')
      .then(response => {
        commit('logout')
        return response;

      })
    }
  },
  modules: {
  }
})
