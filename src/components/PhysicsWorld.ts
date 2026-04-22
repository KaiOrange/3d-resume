import * as CANNON from 'cannon-es'

export class PhysicsWorld {
  public world: CANNON.World

  constructor() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, -20, 0)
    this.world.broadphase = new CANNON.SAPBroadphase(this.world)
    this.world.allowSleep = true
    this.world.defaultContactMaterial.friction = 0.3
    this.world.defaultContactMaterial.restitution = 0.1
  }

  public update(delta: number) {
    this.world.step(1 / 60, delta, 2)
  }

  public addBody(body: CANNON.Body) {
    this.world.addBody(body)
  }
}
