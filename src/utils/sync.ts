import * as CANNON from 'cannon-es'

/** Copy cannon-es Vec3 to any object with x/y/z. */
export function copyVec3(target: { x: number; y: number; z: number }, source: CANNON.Vec3) {
  target.x = source.x
  target.y = source.y
  target.z = source.z
}

/** Copy cannon-es Quaternion to any object with x/y/z/w. */
export function copyQuat(target: { x: number; y: number; z: number; w: number }, source: CANNON.Quaternion) {
  target.x = source.x
  target.y = source.y
  target.z = source.z
  target.w = source.w
}
