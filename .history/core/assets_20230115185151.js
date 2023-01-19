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
          // { name: 'particleMaskTexture', source: '/assets/particleMask.png', type: 'texture' },
          // { name: 'smokeTexture', source: '/assets/smoke.png', type: 'texture' },

          {
            type: 'gltfModel',
            source: logoUrl3d,
            name: 'logo3d',
          },
          {
            type: 'gltfModel',
            source: logoAlt,
            name: 'logoAlt',
          },
          {
            type: 'img',
            source: smoke2d,
            name: 'smoke2d',
          },
          {
            type: 'texture',
            source: smoke,
            name: 'smoke',
          },

          // {
          //   type: 'texture',
          //   source: thicc,
          //   name: 'logo-thicc',
          // },
          // {
          //   type: 'gltfModel',
          //   source: man,
          //   name: 'man',
          // },
          // {
          // type: 'gltfModel',
          // source: room,
          // name: 'room',
          // },
          // {
          //   type: 'texture',
          //   source: 'https://rawgit.com/marcobiedermann/playground/master/three.js/smoke-particles/dist/assets/images/clouds.png',
          //   name: 'smoke',
          // },

          // {
          //   type: 'texture',
          //   source: dotTextureUrl,
          //   name: 'dotTexture',
          // },

          {
            type: 'gltfModel',
            source: plus,
            name: 'plus',
          },
          {
            type: 'img',
            source: singleRwhiteUrl,
            name: 'singleRwhite',
          },
          {
            type: 'img',
            source: logoOutlinedUrl,
            name: 'logoOutlined',
          },

          // {
          //   type: 'gltfModel',
          //   source: herschel,
          //   name: 'herschel',
          // },
          // {
          //   type: 'texture',
          //   source: blob1,
          //   name: 'waterBlob1',
          // },
          // {
          //   type: 'texture',
          //   source: blob2,
          //   name: 'waterBlob2',
          // },
          // {
          //   type: 'texture',
          //   source: blob3,
          //   name: 'waterBlob3',
          // },
          // {
          //   type: 'texture',
          //   source: blob4,
          //   name: 'waterBlob4',
          // },
          // {
          //   type: 'texture',
          //   source: blob5,
          //   name: 'waterBlob5',
          // },

          // {
          //   type: 'texture',
          //   source: bg,
          //   name: 'bg',
          // },

          // {
          //   type: 'texture',
          //   source: blob,
          //   name: 'blobMatcap',
          // },
          // {
          //   type: 'texture',
          //   source: blk,
          //   name: 'blkCap',
          // },
          // {
          //   type: 'cubeTexture',
          //   name: 'blobEnv',
          //   source: [nx, ny, nz, px, py, pz],
          // },

          // {
          //   type: 'texture',
          //   source: soul,
          //   name: 'soulCap',
          // },
          // {
          //   type: 'texture',
          //   source: whiteCap,
          //   name: 'whiteCap',
          // },

        ],
  },
]
