<template>
  <v-app id="app">
    <v-toolbar
      id="SecretBallot_Toolbar"
      flat
      app
    >
      <v-toolbar-title id="SecretBallot_ToolbarText">
        <img
          id="SecretBallot_ToolbarIcon"
          src="/assets/SecretBallot_icon.svg"
        >
        <b class="pl-2">Secret Ballot</b>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <div class="main">
        <router-view/>
      </div>
    </v-content>

    <v-footer
      id="SecretBallot_Footer"
      class="text-xs-center"
      app
    >
      <v-container>
        <v-flex xs12>
          <v-card
            id="SecretBallot_FooterCard"
            align-center
            flat
          >
            <v-card-text>
              <div id="SecretBallot_FooterText">
                This service is powered by Oasis Network. <br />
                Learn more about "Oasis Services" or review step by step process on how to build this service.
              </div>
            
              <br />
              <br />

              <img
                id="SecretBallot_FooterLogo"
                src="/assets/logo-red.png"
              >
            </v-card-text>
          </v-card>
        </v-flex>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      //
    }
  }
}
</script>

<style scoped lang="scss">
@import "./variables.scss";
@font-face {
    font-family: 'Sul Sans';
    src: url('/assets/sulsans/Regular.woff2') format('woff2'),
        url('/assets/sulsans/Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Sul Sans';
    src: url('/assets/sulsans/Bold.woff2') format('woff2'),
        url('/assets/sulsans/Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Sul Sans';
    src: url('/assets/sulsans/Light.woff2') format('woff2'),
        url('/assets/sulsans/Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}

body, .application {
  font-family: 'Sul Sans',Roboto,sans-serif;
}

#SecretBallot_App {
  background-color: $lightgray;
}

#SecretBallot_Footer {
  background-color: $lightgray;

  height: 200px !important;
}

#SecretBallot_FooterCard {
  background-color: $lightgray;
}

#SecretBallot_FooterLogo {
  height: 20px;
  width: 110px;

  position: relative;
  bottom: 20px;
}

#SecretBallot_FooterText {
  font-family: Sul Sans;
  font-size: 13px;
  line-height: 19px;

  color: #5B6872;
}

#SecretBallot_Toolbar {
  background-color: $lightgray;
  height: 120px;
}

#SecretBallot_ToolbarIcon {
  height: 40px;
  width: 32.5px;

  position: relative;
  top: 10px;
}

#SecretBallot_ToolbarText {
  font-family: Sul Sans;
  font-size: 20px;

  color: $oasisred;
  text-transform: none;

  position: relative;
  left: 80px;
  top: 20px;
}
</style>
