while getopts ":h:p:" option; do
   case $option in
      h) # display Help
         host=$OPTARG;;
      p) # Enter a name
         install_path=$OPTARG;;
     \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done

if [ -z "${host+xxx}" ]; 
    then read -p "Host: " host;
fi

if [ -z "${install_path+xxx}" ]; 
    then read -p "Path: " install_path;
fi

pnpm run build

ssh $host "mkdir -p $install_path/bookself"

scp package.json $host:$install_path/bookself/
scp pnpm-lock.yaml $host:$install_path/bookself/
scp -r .next/* $host:$install_path/bookself/.next/

ssh $host "mkdir -p $install_path/bookself/prisma"
scp -r prisma/* $host:$install_path/bookself/prisma/

ssh $host "mkdir -p $install_path/bookself/public"
scp public/* $host:$install_path/bookself/public/

scp .env $host:$install_path/bookself
scp pm2.json $host:$install_path/bookself

ssh $host "cd $install_path/bookself && export NVM_DIR=~/.nvm && source ~/.nvm/nvm.sh && pnpm install --prod && export PATH=$PATH:/root/.local/share/pnpm && pm2 startOrRestart pm2.json"