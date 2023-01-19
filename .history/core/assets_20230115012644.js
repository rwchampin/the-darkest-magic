import smoke from '~/assets/img/clouds.png?url'
import man from '~/assets/models/man.glb?url'
import logoAlt from '~/assets/models/logo-official.glb?url'
import plus from '~/assets/models/plus.glb?url'
import room from '~/assets/models/room.glb?url'
import bg from '~/assets/img/bg.jpg?url'
import thicc from '~/assets/img/thicc.png?url'
import blob from '/assets/matcaps/big-blog-matcap.png?url'
import blk from '/assets/matcaps/blk-cap.png?url'
import soul from '/assets/matcaps/soul-matcap.jpeg?url'
import whiteCap from '/assets/matcaps/white-cap.png?url'
import nx from '/assets/env-maps/cubeEnvironmentMap/nx.png?url'
import ny from '/assets/env-maps/cubeEnvironmentMap/ny.png?url'
import nz from '/assets/env-maps/cubeEnvironmentMap/nz.png?url'
import px from '/assets/env-maps/cubeEnvironmentMap/px.png?url'
import py from '/assets/env-maps/cubeEnvironmentMap/py.png?url'
import pz from '/assets/env-maps/cubeEnvironmentMap/pz.png?url'
import blob1 from '/assets/water/normal.jpg?url'
import blob2 from '/assets/water/disp.png?url'
import blob3 from '/assets/water/rough.jpg?url'
import blob4 from '/assets/water/occ.jpg?url'
import blob5 from '/assets/water/watercolor.jpg?url'
import herschel from '/assets/models/herschel.glb?url'
import trail from '/assets/img/trail.png?url'
import smoke2d from '/assets/img/smoke2d.png?url'
import logoUrl3d from '~/assets/models/logo-official.glb?url'
import singleRwhiteUrl from '~/assets/logo/single-white-r.png?url'
import logoOutlinedUrl from '~/assets/logo/outlined-white-logo.png?url'
import dotTextureUrl from '~/assets/particles/dotTexture.png?url'
import particleMask from '~/assets/particles/particleMask.png?url'

export default [
  {
    name: 'base',
    data: {},
    items:
        [
          { name: 'particleMaskTexture', source: '/assets/particleMask.png', type: 'texture' },
          { name: 'smokeTexture', source: '/assets/smoke.png', type: 'texture' },

          {
            type: 'gltfModel',
            path: logoUrl3d,
            name: 'logo3d',
          },
          {
            type: 'gltfModel',
            path: logoAlt,
            name: 'logoAlt',
          },
          {
            type: 'img',
            path: smoke2d,
            name: 'smoke2d',
          },
          {
            type: 'texture',
            path: smoke,
            name: 'smoke',
          },

          {
            type: 'texture',
            path: thicc,
            name: 'logo-thicc',
          },
          {
            type: 'gltfModel',
            path: man,
            name: 'man',
          },
          {
            type: 'gltfModel',
            path: room,
            name: 'room',
          },
          {
            type: 'texture',
            path: 'https://rawgit.com/marcobiedermann/playground/master/three.js/smoke-particles/dist/assets/images/clouds.png',
            name: 'smoke',
          },
          {
            type: 'texture',
            path: particleMask,
            name: 'particleMask',
          },

          {
            type: 'texture',
            path: dotTextureUrl,
            name: 'dotTexture',
          },

          {
            type: 'gltfModel',
            path: plus,
            name: 'plus',
          },
          {
            type: 'img',
            path: singleRwhiteUrl,
            name: 'singleRwhite',
          },
          {
            type: 'img',
            path: logoOutlinedUrl,
            name: 'logoOutlined',
          },

          {
            type: 'img',
            path: trail,
            name: 'trail',
          },
          {
            type: 'gltfModel',
            path: herschel,
            name: 'herschel',
          },
          {
            type: 'texture',
            path: blob1,
            name: 'waterBlob1',
          },
          {
            type: 'texture',
            path: blob2,
            name: 'waterBlob2',
          },
          {
            type: 'texture',
            path: blob3,
            name: 'waterBlob3',
          },
          {
            type: 'texture',
            path: blob4,
            name: 'waterBlob4',
          },
          {
            type: 'texture',
            path: blob5,
            name: 'waterBlob5',
          },

          // {
          //   type: "texture",
          //   path: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png",
          //   name: "zoomNoise",
          // },
          {
            type: 'texture',
            path: bg,
            name: 'bg',
          },

          {
            type: 'texture',
            path: blob,
            name: 'blobMatcap',
          },
          {
            type: 'texture',
            path: blk,
            name: 'blkCap',
          },
          {
            type: 'cubeTexture',
            name: 'blobEnv',
            path: [nx, ny, nz, px, py, pz],
          },

          {
            type: 'texture',
            path: soul,
            name: 'soulCap',
          },
          {
            type: 'texture',
            path: whiteCap,
            name: 'whiteCap',
          },

        ],
  },
]
