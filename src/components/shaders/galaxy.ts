export const galaxyVertexShader = `
uniform float uSize;
attribute float aScale;

varying vec3 vColor;
uniform float uTime;

attribute vec3 aRandomness;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= (50.0 / -viewPosition.z);

    vColor = color;
}
`

export const galaxyFragmentShader = `
varying vec3 vColor;
void main()
{
    vec2 centeredCoord = gl_PointCoord - vec2(0.5);
    float dist = length(centeredCoord) * 2.0;

    // Early discard - skip expensive calculations for edge pixels
    if (dist > 0.9) discard;

    // Soft particle with fast falloff
    float strength = 1.0 - dist;
    strength = strength * strength * strength * strength; // pow(x, 4) - faster than pow(x, 8)

    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, strength);
}
`
