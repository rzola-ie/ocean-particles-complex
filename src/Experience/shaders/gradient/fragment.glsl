varying vec2 vUv;

uniform vec3 uColorTop;
uniform vec3 uColorBottom;
uniform float uColorOffset;
uniform float uColorMultiplier;

void main() {

  vec3 color = mix(uColorBottom, uColorTop, vUv.y + uColorOffset) * uColorMultiplier;

  gl_FragColor = vec4(color, 1.0);
}