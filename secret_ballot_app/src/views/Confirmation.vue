<template>
  <v-container id="Confirm_Container" fill-height>
    <v-card
      id="Confirm_Card"
      flat
    >
      <v-card-text>
        <div id="Confirm_Message">
          <div>
            <img
              id="Confirm_SubmittedIcon"
              src="/assets/SecretBallot_submitted.svg"
            >
          </div>
          <div class="pt-2">
            Your answer has been submitted!
          </div>
        </div>
        <div class="text-xs-center pt-4">
          <v-btn id="Confirm_Button" to="/results">
            View the result
          </v-btn>
        </div>
      </v-card-text>

      <v-card-actions>
        
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Confirm',
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

#Confirm_Card {
  background-color: $lightgray;

  display: block;
  margin-left: auto;
  margin-right: auto;
}

#Confirm_Container {
  position: relative;
  top: 25vh;
}

#Confirm_Message {
  font-family: Sul Sans;
  font-size: 25px;
  font-weight: bold;
  line-height: 29px;
  text-align: center;

  color: #334857;
}

#Confirm_Button {
  height: 38px;
  width: 139px;

  background-color: $brightblue;
  border-radius: 3px;
  color: $lightgray;

  font-family: Sul Sans;
  font-size: 15px;
  font-weight: bold;
  text-transform: none;
  line-height: 18px;

  -webkit-box-shadow: none;
	-moz-box-shadow: none;
  box-shadow: none;
}

#Confirm_SubmittedIcon {
  height: 40px;
  width: 40px;
}
</style>
