#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

#pragma glslify: cnoise = require('../partials/perlinNoise3d.glsl')
#pragma glslify: rotate = require('../partials/rotate.glsl')

void main() {
  vec2 centeredUv = vUv - 0.5;
  float distanceToCenter = length(vUv - 0.5);
  float radialRatio = atan(centeredUv.y, centeredUv.x) / (PI * 2.0) + 0.5;

  // discard
  float discardPerlin = cnoise(vec3(centeredUv * 20.0, uTime));
  if(distanceToCenter - discardPerlin * 0.03 > 0.5 - (0.03 * 0.5)) discard;

  // first pass
  vec2 distortedUv1 = rotate(centeredUv, distanceToCenter * 6.0);
  float mix1 = cnoise(vec3(distortedUv1 * 20.0, uTime));
  mix1 += cnoise(vec3(distortedUv1 * 8.0, uTime * 0.001));
  mix1 -= distanceToCenter;
  // mix1 = step(- 1.5, mix1);
  vec3 color = mix(uColor1, uColor2, mix1);

  // second pass
  vec2 distortedUv2 = rotate(centeredUv, distanceToCenter * 4.0 + uTime * 0.05);
  float mix2 = cnoise(vec3(distortedUv2 * 20.0, uTime * 0.1));
  mix2 += cnoise(vec3(distortedUv2 * 3.0, uTime * 0.5));
  mix2 -= distanceToCenter;
  // mix2 = step(- 1.5, mix2);
  color = mix(color, uColor3, mix2);

  // third pass
  // vec2 distortedUv3 = rotate(centeredUv, uTime * 0.05);
  // float mix3 = cnoise(vec3(distortedUv3 * 25.0, uTime * 0.5));
  // mix3 += cnoise(vec3(distortedUv3 * 3.0, uTime * 0.5));
  // mix3 += (distanceToCenter - 0.6) * 1.0;
  // mix3 = smoothstep(0.0, 1.0, mix3);
  // color = mix(color, uColor4, mix3);




  gl_FragColor = vec4(color, 1.0);

}