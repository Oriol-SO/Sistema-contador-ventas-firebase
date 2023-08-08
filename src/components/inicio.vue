
<template>
    <div>
        <v-card class="ma-5 px-3">
            <v-card-title>
                Registros recientes
            </v-card-title>
            <v-row>
                <v-col cols="12" sm="4">
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
                <v-col cols="12" sm="8">
                    <v-card-text>   
                        <v-data-table
                            :headers="headers"
                            :items="registros"
                            :items-per-page="-1"
                            class="elevation-1"
                        >
                            <template v-slot:[`item.fecha`]="{ item }">
                                <v-chip
                                    color="warning"
                                    dark
                                >
                                {{ get_fecha(item.fecha) }}
                                </v-chip>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-col>
            </v-row>
      
        </v-card>
    </div>
</template>
<script>
import { firestore } from '@/plugins/firebase.js';
import { collection, onSnapshot,doc,updateDoc,arrayUnion  } from 'firebase/firestore';
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
            const reg=doc(collection(firestore,'registros'),'semana1');

            updateDoc(reg,{
                registros:arrayUnion(this.form)
            })
            .then(() => {
                console.log('Datos agregados exitosamente al documento en Firebase');
                this.form.cantidad='';
                this.form.precio='';
            })
            .catch((error) => {
                console.error('Error al agregar datos al documento:', error);
            })
            .finally(()=>{
                this.loader=false;
            });

        },
        get_fecha(fecha){
            const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const fechaFormateada = new Date(fecha.seconds * 1000).toLocaleDateString('es-ES', opcionesDeFormato);
            return fechaFormateada;
        }
    },
    async mounted() {
        const regs=doc(collection(firestore,'registros'),'semana1');
        
        onSnapshot(regs, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const datosDelDocumento = docSnapshot.data();
                this.registros=datosDelDocumento.registros;
                console.log('Datos actualizados del documento:', datosDelDocumento);
            } else {
                console.log('El documento ya no existe');
            }
          //this.registros= querySnapshot.docs.map((doc) => doc.data());
        }, (error) => {
            console.error('Error al escuchar los cambios:', error);
        });
        
      
        
    }
}
</script>