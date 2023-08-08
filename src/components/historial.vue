<template>
    <div>
        <v-card>
            <v-card-title>
                Historial
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-select></v-select>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-data-table
                        
                        ></v-data-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    name:'HistorialPage'
}
</script>