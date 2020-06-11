import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let getUser = () => {

    let userData = {
      id: '1',
      geoData: "Ukraine",
      device: "Mac OS",
      version:"10.15.5",
      purchase: "100"
    }

    return userData
  }
  console.log(getUser())

  let server = new Server({
    environment,

    models: {
      event: Model,
    },

    seeds(server) {
      server.create("event", getUser())
    },

    routes() {
      this.namespace = "api"

      this.get("/event", (schema) => {
        return schema.events.all()
      })
    },
  })

  return server
}