<template>
  <v-container id="Vote_Container" fill-height>
    <v-card
      id="Vote_Card"
      flat
    >
      <v-card-text>
        <div id="Vote_Question">
          {{ question }}
        </div>
        <div id="Vote_Reminder" class="pt-3">
          You can only choose one.
        </div>

        <v-radio-group v-model="radios">
          <template v-for="option of options">
            <div class="Vote_Option pa-3 ma-1">
              <v-radio :value="option">
                <template v-slot:label>
                  <div>{{ option }}</strong></div>
                </template>
              </v-radio>
            </div>
          </template>
        </v-radio-group>

        <div class="text-xs-center">
          <v-btn id="Vote_UnselectedButton" disabled v-if="radios === null">
            Submit your answer
          </v-btn>
          <v-btn id="Vote_SelectedButton" to="/confirm" v-else>
            Submit your answer
          </v-btn>
        </div>
        <div id="Vote_Warning" class="pt-3" v-if="radios !== null">
          <img
            id="Vote_WarningIcon"
            src="/assets/SecretBallot_warn.svg"
          >
          <span class="pl-1">
            Once you submit, you won't be able to change your answer <br />
            or vote again as a different identity.
          </span>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Vote',
  async created () {
    this.options = await getCandidates();
    this.question = await getDescription();
  },
  data () {
    return {
      options: [],
      question: '',
      radios: null,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

#Vote_Card {
  background-color: $lightgray;

  display: block;
  margin-left: auto;
  margin-right: auto;
}

#Vote_Container {
  position: relative;
  top: 5vh;

  overflow-y: scroll;
}

#Vote_Reminder {
  font-family: Sul Sans;
  font-size: 17px;
  line-height: 20px;
  text-align: center;

  color: #5b6872;
}

#Vote_Question {
  font-family: Sul Sans;
  font-size: 25px;
  font-weight: bold;
  line-height: 29px;
  text-align: center;

  color: #334857;
}

#Vote_SelectedButton {
  height: 38px;
  width: 173px;

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

#Vote_UnselectedButton {
  height: 38px;
  width: 173px;

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

#Vote_Warning {
  font-family: Sul Sans;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #5b6872;
  mix-blend-mode: normal;
  opacity: 0.59;
}

#Vote_WarningIcon {
  height: 17.5px;
  width: 16px;

  position: relative;
  top: 4px;
}

.Vote_Option {
  height: 56px;
  width: 480px;

  background: white;
  border: 1.5px solid #eaeef1;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
