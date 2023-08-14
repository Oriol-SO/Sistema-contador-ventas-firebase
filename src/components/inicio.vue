
<template>
    <div>
        <v-card class="ma-5 px-3">
            <v-card-title>
                Registros recientes
            </v-card-title>
            <v-card-title>
                <v-btn color="purple" class="white--text" @click="resetear()" >Resetear tabla</v-btn>
                <v-btn class="ml-auto" color="warning" to="/historial">HISTORIAL</v-btn>
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
                    <v-card-title >
                        <v-chip large color="orange" class="text-h5 ">CT: <strong>{{ sumacantidad }}</strong></v-chip>
                        <v-chip large color="yellow" class="text-h5 ml-5">PT: <strong>{{ sumaprecio }}</strong></v-chip>
                        <!--span class="ml-auto"> id: {{ this.iddocumento }}</span-->
                    </v-card-title>
                    <v-card-text>   
                        <v-data-table
                            :headers="headers"
                            :items="registros"
                            :items-per-page="-1"
                            class="elevation-1"
                        >
                            <template v-slot:[`item.fecha`]="{ item }">
                                <v-chip
                                    color="primary"
                                    dark
                                >
                                {{ get_fecha(item.fecha) }}
                                </v-chip>
                            </template>
                            <template v-slot:[`item.del`]="{ item }">
                               <v-btn @click="eliminar(item,)" small color="error" rounded>Quitar</v-btn>
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
import { collection, onSnapshot,doc,updateDoc,arrayUnion,query, orderBy, limit,getDocs,addDoc,arrayRemove  } from 'firebase/firestore';
export default{
    name: 'InicioPage',
    data(){
        return{
            headers: [
                
                { text: 'cantidad', value: 'cantidad' },
                { text: 'precio', value: 'precio' },
                { text: 'fecha', value: 'fecha' },
                { text: 'Del', value: 'del' },
            ],

            form:{
                cantidad:null,
                precio:null,
                fecha:null,
            },
            loader:false,
            registros:[],

            ultimoDocumento:null,
            iddocumento:null,

            
        }
    },computed:{
        sumacantidad(){
            let sumcant=0;
            this.registros.forEach(element=>{
                sumcant=sumcant+parseFloat(element.cantidad)
            })
            return sumcant;
            
        },
        sumaprecio(){
            let sumpre=0;
            this.registros.forEach(element=>{
                sumpre=sumpre+(parseFloat(element.precio))
            })
            return sumpre;
        }
    },    
    methods:{
        enviardato(){
            this.loader=true;
            this.form.fecha=new Date();
            const reg=doc(collection(firestore,'registros'),this.iddocumento);

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
        },
        async obtener_ultimo_grupo(){
            const end=collection(firestore,'registros');

            const q = query(end, orderBy('inicio', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                this.ultimoDocumento = querySnapshot.docs[0].data();
                return querySnapshot.docs[0].id; 
            } else {
                console.log('La colección está vacía.');
                return null;
            }
          
        },
       async  resetear(){
            if(!confirm('¿Estas seguro de realizar esta acción?')){
                return ;
            }
            const reset = collection(firestore, 'registros');
            const nuevoDocumentoRef= await addDoc(reset, {
                inicio: new Date(),
                registros:[],
            });

            console.log('Nuevo documento creado con ID:', nuevoDocumentoRef.id);
            this.registros=[];
            this.get_datos_registro();   
        },

        async get_datos_registro(){
            this.iddocumento=await this.obtener_ultimo_grupo();
            const regs=doc(collection(firestore,'registros'),this.iddocumento);  
            onSnapshot(regs, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const datosDelDocumento = docSnapshot.data();
                    this.registros=datosDelDocumento.registros;
                    
                } else {
                    console.log('El documento ya no existe');
                }
            //this.registros= querySnapshot.docs.map((doc) => doc.data());
            }, (error) => {
                console.error('Error al escuchar los cambios:', error);
            });
        },
        
        
        eliminar(item){
            console.log(item)
            const del=doc(collection(firestore,'registros'),this.iddocumento);
            updateDoc(del, {
                registros: arrayRemove(item)
            })
            .then(() => {
                console.log('Elemento removido del array en la actualización.');
            })
            .catch(error => {
                console.error('Error al remover el elemento del array:', error);
            });
        }
    },
    mounted() {
        this.get_datos_registro();      
        
    }
}
</script>