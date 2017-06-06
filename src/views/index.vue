<style scoped>
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    .index h2 {
        margin-bottom: 200px;
    }

    .index h2 p {
        margin: 0 0 50px;
    }

    .index .ivu-row-flex {
        height: 100%;
    }
    .index .title{
        color:#fff;
        font-size:22pt;
        font-weight:100;
    }
</style>
<template>
    <div class="index">
    <IFullImg/>
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h2>
                    <p class="title">品质成钞两周年</p>
                    <Button type="ghost">我要留言</Button>
                </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
    import IFullImg from '../components/IFullImage/IFullImage';
    export default {
        components: {
            IFullImg
        },
    };
</script>