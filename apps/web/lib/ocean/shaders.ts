export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform float uIntro;
uniform float uMotion;
uniform float uSize;
uniform float uPixelRatio;
uniform vec2 uCursor;
uniform float uCursorStrength;
uniform float uAspect;

attribute vec3 aPos1;
attribute vec3 aPos2;
attribute vec3 aPos3;
attribute vec3 aScatter;
// x: size, y: phase, z: speed, w: stagger
attribute vec4 aRandom;

varying float vAlpha;
varying float vGlow;
varying float vHeight;
varying float vRipple;

const float PI = 3.141592653589793;

void main() {
  float p = clamp(uProgress, 0.0, 2.999);
  float seg = floor(p);
  float f = fract(p);

  vec3 from = seg < 0.5 ? position : seg < 1.5 ? aPos1 : aPos2;
  vec3 to = seg < 0.5 ? aPos1 : seg < 1.5 ? aPos2 : aPos3;

  float local = smoothstep(0.0, 1.0, clamp((f - aRandom.w * 0.3) / 0.7, 0.0, 1.0));
  vec3 pos = mix(from, to, local);
  // Mid-morph the cloud loosens like a school of fish regrouping
  pos += aScatter * 0.32 * sin(local * PI);

  float intro = smoothstep(aRandom.w * 0.6, aRandom.w * 0.6 + 0.4, uIntro);
  pos = mix(aScatter * 3.5, pos, intro);

  float t = uTime * uMotion;
  float jelly = 1.0 - clamp(abs(p - 2.0), 0.0, 1.0);
  float swimmer = 1.0 - jelly;

  // Body undulation for swimmers, bell pulse for the jellyfish
  pos.x += sin(pos.z * 1.6 - t * 1.8) * 0.06 * swimmer * uMotion;
  pos.y += sin(pos.x * 1.2 - t * 1.4) * 0.08 * swimmer * uMotion;
  float pulse = sin(t * 1.6 - pos.y * 1.8);
  pos.xz *= 1.0 + pulse * 0.06 * jelly * uMotion;
  float trailing = smoothstep(0.7, -1.9, pos.y) * jelly * uMotion;
  pos.x += sin(pos.y * 2.2 - t * 1.4) * 0.18 * trailing;
  pos.z += cos(pos.y * 1.8 - t * 1.1) * 0.12 * trailing;

  // Ocean current drift
  pos += vec3(
    sin(t * 0.6 + aRandom.y * 6.2831 + pos.y * 2.0),
    cos(t * 0.5 + aRandom.y * 6.2831 + pos.x * 1.5),
    sin(t * 0.4 + aRandom.y * 6.2831)
  ) * 0.035 * aRandom.z * uMotion;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vec4 clip = projectionMatrix * mv;

  vec2 ndc = clip.xy / clip.w;
  vec2 diff = (ndc - uCursor) * vec2(uAspect, 1.0);
  float d = length(diff);
  float ripple = smoothstep(0.32, 0.0, d) * uCursorStrength;
  float ring = sin(d * 38.0 - uTime * 6.0) * 0.5 + 0.5;
  mv.xy += normalize(diff + 1e-5) * ripple * (0.35 + ring * 0.2);
  mv.z += ripple * 0.4;

  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aRandom.x * uPixelRatio * (1.0 + ripple * 0.8) / -mv.z;

  float shimmer = 0.5 + 0.5 * sin(uTime * (0.8 + aRandom.z * 1.6) + aRandom.y * 6.2831);
  vGlow = pow(shimmer, 6.0) * mix(0.4, 1.0, uMotion);
  vHeight = clamp(pos.y * 0.3 + 0.5, 0.0, 1.0);
  vRipple = ripple;
  vAlpha = intro * smoothstep(-22.0, -7.0, mv.z);
}
`

export const particleFragment = /* glsl */ `
uniform vec3 uColorDeep;
uniform vec3 uColorMid;
uniform vec3 uColorGlow;
uniform float uOpacity;

varying float vAlpha;
varying float vGlow;
varying float vHeight;
varying float vRipple;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float halo = smoothstep(0.5, 0.0, d);
  float core = smoothstep(0.18, 0.0, d);

  vec3 color = mix(uColorDeep, uColorMid, vHeight);
  color = mix(color, uColorGlow, clamp(vGlow + vRipple * 0.6, 0.0, 1.0));

  float alpha = (halo * 0.35 + core * 0.65) * vAlpha * uOpacity;
  alpha *= 0.55 + vGlow * 0.45 + vRipple * 0.3;
  gl_FragColor = vec4(color, alpha);
}
`

export const bubbleVertex = /* glsl */ `
uniform float uTime;
uniform float uMotion;
uniform float uSize;
uniform float uPixelRatio;
uniform float uHeight;

// x: size, y: speed, z: phase
attribute vec3 aRandom;

varying float vAlpha;

void main() {
  vec3 pos = position;
  float t = uTime * uMotion;
  pos.y = mod(pos.y + t * aRandom.y + uHeight * 0.5, uHeight) - uHeight * 0.5;
  pos.x += sin(t * 1.3 + aRandom.z * 6.2831) * 0.12;
  pos.z += cos(t * 0.9 + aRandom.z * 6.2831) * 0.08;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aRandom.x * uPixelRatio / -mv.z;

  float edge = abs(pos.y) / (uHeight * 0.5);
  vAlpha = (1.0 - smoothstep(0.7, 1.0, edge)) * smoothstep(-24.0, -6.0, mv.z);
}
`

export const bubbleFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;

varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float rim = smoothstep(0.5, 0.42, d) * smoothstep(0.28, 0.44, d);
  float spec = smoothstep(0.12, 0.0, length(gl_PointCoord - vec2(0.36, 0.34)));
  gl_FragColor = vec4(uColor, (rim * 0.55 + spec * 0.8) * vAlpha * uOpacity);
}
`
