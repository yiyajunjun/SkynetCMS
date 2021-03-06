layui.use(['form','layer','jquery','session'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        session = layui.session;


    $(".loginBody .seraph").click(function(){
        layer.msg("这只是做个样式，至于功能，你见过哪个后台能这样登录的？还是老老实实的找管理员去注册吧",{
            time:5000
        });
    })

    //登录按钮
    form.on("submit(login)",function(data){
        // layer.msg(JSON.stringify(data.field));
        console.log(data.field);
        layui.session.setLastServerName(data.field.server);
        session.login(data.field.account, data.field.password);
        return false;
    })

    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })

    
    $('#serverSelect').empty();
    for (i in window.serverlist){
        let server = window.serverlist[i];
        $('#serverSelect').append("<option value="+server.name+">"+server.desc+"</option>");
    }   
    var last = session.getLastServerName();
    if(last){
        $('#serverSelect').val(last);
    }   
    form.render();
})
