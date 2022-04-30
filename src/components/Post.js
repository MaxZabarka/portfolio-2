import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import React from 'react';

const Post = () => {
    return (
        <EffectComposer>
        <Bloom luminanceThreshold={0.4} intensity={3} luminanceSmoothing={1} />
        <Vignette eskil={false} offset={0.3} darkness={-0.6} />
      </EffectComposer>
    );
};

export default Post;