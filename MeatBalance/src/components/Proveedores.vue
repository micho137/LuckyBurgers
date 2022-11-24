<template>
    <v-main class="bg-grey-lighten-3 h-100">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-sheet rounded="lg">
                <v-list rounded="lg">
                  <v-list-item
                    v-for="opciones in 5"
                    :key="opciones"
                    link
                  >
                    <v-list-item-title>
                      {{opciones}}
                    </v-list-item-title>
                  </v-list-item>
  
                  <v-divider class="my-2"></v-divider>
  
                  <v-list-item
                    link
                    color="grey-lighten-4"
                  >
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>
  
            <v-col>
              <v-sheet
                min-height="70vh"
                rounded="lg"
              >
                <!--  -->
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
</template>