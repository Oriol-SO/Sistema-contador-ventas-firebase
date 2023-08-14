<template>
    <div>
        <v-card>
            <v-card-title>
                Historial
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-autocomplete
                        :items="grupos"
                        v-model="grupo"
                        item-text="inicio"
                        return-object
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-card-title >
                        <v-chip large color="orange" class="text-h5 ">CT: <strong>{{ sumacantidad }}</strong></v-chip>
                        <v-chip large color="yellow" class="text-h5 ml-5">PT: <strong>{{ sumaprecio }}</strong></v-chip>
                        <!--span class="ml-auto"> id: {{ this.iddocumento }}</span-->
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="grupo?.registros"
                            :items-per-page="-1"
                            class="elevation-1"
                        >
                            <template v-slot:[`item.fecha`]="{ item }">
                                <v-chip
                                    color="purple"
                                    dark
                                >
                                {{ get_fecha(item.fecha) }}
                                </v-chip>
                            </template>
                        ></v-data-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import { firestore } from '@/plugins/firebase.js';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
export default {
    name:'HistorialPage',
    data(){
        return{
            grupo:null,
            grupos:[],
            headers: [
                
                { text: 'cantidad', value: 'cantidad' },
                { text: 'precio', value: 'precio' },
                { text: 'fecha', value: 'fecha' },
            ],
        }
    },methods:{
        get_documents(){
            const histo=collection(firestore,'registros');

            const consulta = query(histo, orderBy('inicio', 'desc'));

            getDocs(consulta)
            .then(querySnapshot => {
                const documentos = [];

                querySnapshot.forEach(doc => {
                    documentos.push({
                        id: doc.id,
                        registros: doc.data().registros,
                        inicio:'Grupo de '+this.get_fecha(doc.data().inicio)
                    });
                });

                this.grupos=documentos
            })
            .catch(error => {
                console.error('Error al obtener los documentos de la colección:', error);
            });
        },
        
        get_fecha(fecha){
            const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const fechaFormateada = new Date(fecha.seconds * 1000).toLocaleDateString('es-ES', opcionesDeFormato);
            return fechaFormateada;
        },
    },mounted(){
        this.get_documents();
    },computed:{
        sumacantidad(){
            let sumcant=0;
            this.grupo?.registros.forEach(element=>{
                sumcant=sumcant+parseFloat(element.cantidad)
            })
            return sumcant;
            
        },
        sumaprecio(){
            let sumpre=0;
            this.grupo?.registros.forEach(element=>{
                sumpre=sumpre+(parseFloat(element.precio))
            })
            return sumpre;
        }
    }
}
</script>