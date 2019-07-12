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
            Your vote has been submitted!
          </div>
        </div>
        <div class="text-xs-center pt-4">
          <template v-if="voteClosed">
            <v-btn id="Confirm_ButtonClosed" to="/results">
              View the result
            </v-btn>
          </template>
          <template v-else>
            <div id="Confirm_VoteOpenDisclaimer" class="pb-4">
              The results will be available when the ballot closes in <span>{{ timeToClose }}</span>. <br />
              We advocate for privacy and information disclosure.
            </div>
            <v-btn id="Confirm_ButtonOpen">
              View the result
            </v-btn>
          </template>
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
  data () {
    return {
      voteClosed: false,
      timeToClose: '1 day and 7 hours',
    };
  },
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

#Confirm_ButtonClosed {
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

#Confirm_ButtonOpen {
  height: 38px;
  width: 139px;

  background-color: #eaeef1;;
  border-radius: 3px;
  color: #c3c9cd;

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

#Confirm_VoteOpenDisclaimer {
  font-family: Sul Sans;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  text-align: center;

  color: #5B6872;

}

#Confirm_VoteOpenDisclaimer span {
  font-weight: bold;
}
</style>
