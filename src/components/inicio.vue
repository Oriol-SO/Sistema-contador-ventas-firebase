
<template>
    <div>
        
        <v-card class="ma-5 px-3">
            <v-card-title>
                Registros recientes
            </v-card-title>
            <v-row>
                <v-col cols="12" md="4">
                    <v-card>
                        <form action=""
                        @submit.prevent="enviardato()"
                        >
                        <v-card-text>
                            <v-text-field
                            label="Cantidad"
                            type="number"
                            step="any"
                            required
                            v-model="form.cantidad"
                            ></v-text-field>

                            <v-text-field
                            required
                            step="any"
                            type="number"
                            label="Precio"
                            v-model="form.precio"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="black" class="white--text" type="submit" :loading="loader" :disable="loader">Enviar</v-btn>
                        </v-card-actions>
                        </form>
                    </v-card>             
                </v-col>
                <v-col cols="12" md="8">
                    <v-card-text>   
                        <v-data-table
                            :headers="headers"
                            :items="registros"
                            :items-per-page="-1"
                            class="elevation-1"
                        ></v-data-table>
                    </v-card-text>
                </v-col>
            </v-row>
      
        </v-card>
    </div>
</template>
<script>
import { firestore } from '@/plugins/firebase.js';
import { collection, onSnapshot,addDoc  } from 'firebase/firestore';
export default{
    name: 'InicioPage',
    data(){
        return{
            headers: [
                
                { text: 'cantidad', value: 'cantidad' },
                { text: 'precio', value: 'precio' },
                { text: 'fecha', value: 'fecha' },
            ],

            form:{
                cantidad:'',
                precio:'',
                fecha:'',
            },
            loader:false,
            registros:[]
        }
    },methods:{
        enviardato(){
            this.loader=true;
            this.form.fecha=new Date();
            const reg=collection(firestore,'registros');
            addDoc(reg, this.form)
            .then((docRef) => {
                console.log('Documento agregado con ID:', docRef.id);
                this.loader=false;
                this.form.cantidad='';
                this.form.precio='';
            })
            .catch((error) => {
                console.error('Error al agregar el documento:', error);
            });
        },
    },
    async mounted() {
        const regs=collection(firestore,'registros')
        
        onSnapshot(regs, (querySnapshot) => {
          this.registros= querySnapshot.docs.map((doc) => doc.data());
        }, (error) => {
            console.error('Error al escuchar los cambios:', error);
        });
        
      
        
    }
}
</script>