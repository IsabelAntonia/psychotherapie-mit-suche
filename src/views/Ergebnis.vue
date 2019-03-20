<template>
  <div>
    <div class="background-image"></div>

    <div class="content">
       <div class="hidden-sm-and-up">
        <br />
        <br />
      </div>
      <div v-if="loading" class="loader" style="text-align:center">
        <div class="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div v-else>
        <div v-if="Results" style="display: flex; flex-direction: column;">
          <h2>Ihre Ergebnisse</h2>

          <div class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Adresse</th>
                  <th v-if="distanceGotCalculated">Entfernung</th>
                  <th>Wartezeit</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(therapeut, index) in result" :key="therapeut.id">
                  <td>
                    <a :href="therapeut.therapists.url"
                      >{{ therapeut.therapists.titel }}
                      {{ therapeut.therapists.vorname }}
                      {{ therapeut.therapists.nachname }}</a
                    >
                  </td>
                  <td>{{ therapeut.therapists.adresse }}</td>
                  <td v-if="distanceGotCalculated">
                    {{ therapeut.therapists.distanceText }}
                  </td>
                  <td>{{ therapeut.therapists.wartezeit }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <v-btn style="align-self:center" large color="primary" v-on:click="moveOn7"
            >Zurück zur Suche</v-btn
          >
        </div>

        <div v-else style="display: flex; flex-direction: column; align-items: center;">
          <p class="mb-2">
            Keine Ergebnisse. Bitte ändern Sie Ihre Sucheinstellungen.
          </p>
          <v-btn large color="primary" v-on:click="moveOn7"
            >Zurück zur Suche</v-btn
          >
        </div>
      </div>
       <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ergebnis',
  data() {
    return {
      Results: false,
      loading: false,
      distanceGotCalculated: false
    }
  },
  computed: {
    therapeutenInErgebnis() {
      return this.$store.state.therapeuten
    },
    result() {
      return this.checkTherapists()
    }
  },
  created() {
    this.checkTherapists()
  },
  methods: {
    moveOn7: function() {
      this.$router.replace('therapeutensuche')
    },
    checkTherapists: function() {
      var currentStorage = JSON.parse(localStorage.getItem('therapeuten'))
      if (currentStorage.length > 0 || this.therapeutenInErgebnis.length > 0) {
        this.Results = true
        if (this.therapeutenInErgebnis.length > 0) {
          this.currentTherapeutenInErgebnisName = localStorage.getItem(
            'therapeuten'
          )
          this.currentTherapeutenInErgebnisName2 = JSON.parse(
            this.currentTherapeutenInErgebnisName
          )
          if (
            !(
              this.currentTherapeutenInErgebnisName2[0].therapists
                .distanceValue === undefined
            )
          ) {
            this.distanceGotCalculated = true
          } else {
            this.distanceGotCalculated = false
          }
        } else {
          this.currentTherapeutenInErgebnisName = localStorage.getItem(
            'therapeuten'
          )
          this.currentTherapeutenInErgebnisName2 = JSON.parse(
            this.currentTherapeutenInErgebnisName
          )
          if (
            !(
              this.currentTherapeutenInErgebnisName2[0].therapists
                .distanceValue === undefined
            )
          ) {
            this.distanceGotCalculated = true
          } else {
            this.distanceGotCalculated = false
          }
        }
        return this.currentTherapeutenInErgebnisName2
      } else {
        this.Results = false
      }
    }
  }
}
</script>
<style>
th {
  font-size: 10px;
}
thead {
  background-color: white;
}
.center {
  text-align: center;
}
.lds-default {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-default div {
  position: absolute;
  width: 5px;
  height: 5px;
  background: black;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 29px;
  left: 53px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 18px;
  left: 50px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 9px;
  left: 41px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 6px;
  left: 29px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 9px;
  left: 18px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 18px;
  left: 9px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 29px;
  left: 6px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 41px;
  left: 9px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 50px;
  left: 18px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 53px;
  left: 29px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 50px;
  left: 41px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 41px;
  left: 50px;
}
@keyframes lds-default {
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>